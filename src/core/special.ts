const special: { [key: string]: string } = {
  'padding\\(': 'Padding(\n\t\tpadding: ,',
  'aspectratio\\(': 'AspectRatio(\n\t\taspectRatio: ,',
  'transform\\(': 'Transform(\n\t\ttransform: ,',
  'richtext\\(': 'RichText(\n\t\ttext: ,',
  'scrollable\\(': 'Scrollable(\n\t\tviewportBuilder: (context, offset) => ,',
  'constrainedbox\\(': 'ConstrainedBox(\n\t\tconstraints: ,',
  '(?<=scaffold.*?)child': 'body',
  'elevatedbutton\\(': 'ElevatedButton(\n\t\tonPressed: () {},',
  'textbutton\\(': 'TextButton(\n\t\tonPressed: () {},',
  'iconbutton\\(': 'IconButton(\n\t\tonPressed: () {},',
  'floatingactionbutton\\(': 'FloatingActionButton(\n\t\tonPressed: () {},',
  'dropdownbutton\\(': 'DropDownButton(\n\t\tonPressed: () {},',
  'cupertinobutton\\(': 'CupertinoButton(\n\t\tonPressed: () {},',
}
export function replaceSpecial(text: string): string {
  const keys = Object.keys(special)
  keys.forEach(tag => (text = text.replace(new RegExp(tag, 'is'), special[tag])))
  return text
}
