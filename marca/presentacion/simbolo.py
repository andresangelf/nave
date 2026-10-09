# Nave Café — reconstrucción geométrica del símbolo "Trayectoria"
# Un solo módulo t: grosor de órbita = grosor de la Λ = ancho de canal. Piernas a 45°.
import math, sys, json
from shapely.geometry import Point, Polygon, box
from shapely.ops import unary_union
from shapely import affinity

R, t = 100.0, 28.0          # radio exterior, módulo
rin = R - t                 # radio interior
va = -37.0                  # vértice exterior de la Λ (y, hacia abajo positivo)
k = t * math.sqrt(2)        # espesor vertical de la pierna a 45°
cR = cL = 24.0              # canales (perpendiculares)
BIG = 400

disk = Point(0, 0).buffer(R, quad_segs=40)
ring = disk.difference(Point(0, 0).buffer(rin, quad_segs=40))
right = box(0, -BIG, BIG, BIG)
left = box(-BIG, -BIG, 0, BIG)

def hp_below(m, c):   # {(u,v): v - m*u >= c}
    return Polygon([(-BIG, m*-BIG + c), (BIG, m*BIG + c), (BIG, BIG*3), (-BIG, BIG*3)])
def hp_above(m, c):   # {(u,v): v - m*u <= c}
    return Polygon([(-BIG, m*-BIG + c), (BIG, m*BIG + c), (BIG, -BIG*3), (-BIG, -BIG*3)])

# pierna derecha: va <= v-u <= va+k ; pierna izquierda: va <= v+u <= va+k
legR = hp_below(1, va).intersection(hp_above(1, va + k)).intersection(right)
legL = hp_below(-1, va).intersection(hp_above(-1, va + k)).intersection(left)

A_right = ring.intersection(right).intersection(hp_above(1, va - cR*math.sqrt(2)))
B_right = unary_union([ring, legR]).intersection(right).intersection(hp_below(1, va))
A_left = unary_union([ring, legL]).intersection(left).intersection(hp_above(-1, va + k))
B_left = ring.intersection(left).intersection(hp_below(-1, va + k + cL*math.sqrt(2)))

shape = unary_union([A_right, B_right, A_left, B_left]).intersection(disk)
shape = shape.buffer(0.01).buffer(-0.01)
shape = affinity.translate(shape, 100, 100)  # viewBox 0 0 200 200

def ring_d(coords):
    pts = list(coords)
    s = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts[:-1]) + "Z"
    return s
geoms = getattr(shape, 'geoms', [shape])
d = ""
for g in geoms:
    d += ring_d(g.exterior.coords)
    for h in g.interiors: d += ring_d(h.coords)
print(len(d), 'chars', len(geoms), 'parts', file=sys.stderr)
json.dump({"d": d, "R": R, "t": t}, open(sys.argv[1], "w"))
