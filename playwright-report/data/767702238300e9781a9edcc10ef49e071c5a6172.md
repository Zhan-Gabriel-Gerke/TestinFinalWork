# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - list [ref=e3]:
      - listitem [ref=e4]:
        - link "Avaleht" [ref=e5] [cursor=pointer]:
          - /url: index.php
      - listitem [ref=e6]:
        - link "Broneeri laud" [ref=e7] [cursor=pointer]:
          - /url: broneeringud.php
      - listitem [ref=e8]:
        - link "Menuu" [ref=e9] [cursor=pointer]:
          - /url: Menuu.php
      - listitem [ref=e10]:
        - link "Logi sisse" [ref=e11] [cursor=pointer]:
          - /url: login2.php
  - heading "Restorani broneeringud" [level=1] [ref=e12]
  - generic [ref=e13]:
    - heading "Uue broneeringu lisamine" [level=2] [ref=e14]
    - generic [ref=e15]: "Kliendi nimi:"
    - textbox [ref=e16]
    - generic [ref=e17]: "Kuupäev:"
    - textbox [ref=e18]
    - generic [ref=e19]: "Kellaaeg:"
    - textbox [ref=e20]
    - generic [ref=e21]: "Inimeste arv:"
    - spinbutton [ref=e22]
    - generic [ref=e23]: "Vali laud:"
    - combobox [ref=e24]:
      - option "-- Vali laud --" [selected]
      - 'option "Laud #1 (5 kohta)"'
      - 'option "Laud #2 (2 kohta)"'
      - 'option "Laud #3 (7 kohta)"'
    - button "Lisa broneering" [ref=e25] [cursor=pointer]
  - contentinfo [ref=e26]:
    - separator [ref=e27]
    - paragraph [ref=e28]: Zhan-Gabriel Gerke © 2025
```