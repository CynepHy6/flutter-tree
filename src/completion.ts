import * as vscode from 'vscode'
import { expand, validate } from './core'

export class CompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): Thenable<vscode.CompletionList> {
    const expandedAbbr = getExpandedAbbreviation(document, position)
    const completionItems = expandedAbbr ? [expandedAbbr] : []

    return Promise.resolve(new vscode.CompletionList(completionItems, true))
  }
}

function extractAbbreviation(document: vscode.TextDocument, position: vscode.Position): [vscode.Range, string] {
  const lineText = document.lineAt(position.line).text
  const lineSplit = lineText.split(/\s+/)
  const abbreviation = lineSplit[lineSplit.length - 1].replace(/[^a-z>[\]]*$/gi, '')

  const start = new vscode.Position(position.line, lineText.indexOf(abbreviation))
  const end = new vscode.Position(position.line, lineText.indexOf(abbreviation) + abbreviation.length)

  return [new vscode.Range(start, end), abbreviation]
}

function getExpandedAbbreviation(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.CompletionItem | null {
  const [rangeToReplace, wordToExpand] = extractAbbreviation(document, position)
  const valid = validate(wordToExpand)

  if (!valid) {
    return null
  }
  const completionItem = new vscode.CompletionItem(wordToExpand)
  completionItem.detail = 'Flutter Tree'

  const expandedWord = expand(wordToExpand)
  completionItem.insertText = new vscode.SnippetString(expandedWord)
  completionItem.documentation = removeTabStops(expandedWord)
  completionItem.range = rangeToReplace

  return completionItem
}

function removeTabStops(expandedWord: string): string {
  return expandedWord.replace(/[(]+[$]+[0-9]+[)]/g, '()')
}
