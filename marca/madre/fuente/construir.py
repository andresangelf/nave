"""Arma ../nave-sistema-marca.html a partir de sistema.src.html, ../contenido.json y los vectores de F1.
Uso: python3 construir.py"""
import json, pathlib
A = pathlib.Path(__file__).parent
src = (A / 'sistema.src.html').read_text()
C = json.loads((A.parent / 'contenido.json').read_text())
C['enlaces'] = json.loads((A / 'enlaces.json').read_text()) if (A / 'enlaces.json').exists() else []
L = json.loads((A / 'logotipo-f1.json').read_text())['principal']
k = 201 / 396.77
W = ''.join(f'<path d="{d}"/>' for d in L['d'])
out = (src
  .replace('__DATA__', json.dumps(C, ensure_ascii=False))
  .replace('__LK__', (A / 'simbolo-nave-cafe.svgfrag').read_text())
  .replace('__SYMS__', (A / 'emblemas-pictogramas.svgfrag').read_text())
  .replace('__NAVE_H__', f'<g fill="currentColor"><g transform="scale({k:.6f})"><path d="{L["s"]}"/></g><g transform="translate({236-538.13:.2f} -97.92)">{W}</g></g>')
  .replace('__NAVE_P__', f'<g fill="currentColor"><path d="{L["s"]}"/>{W}</g>')
  .replace('__NAVE_W__', json.dumps(L['d']))
  .replace('__NAVE_S__', L['s']))
assert '__' + 'DATA' not in out
(A.parent / 'nave-sistema-marca.html').write_text(out)
print('ok', len(out))
