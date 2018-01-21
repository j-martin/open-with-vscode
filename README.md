# OpenWith

** Alpha**
Allow to open the current file in any program.

## Known Issue

It assumes that the command will be executed from the vim extension with valid
arguments. At this point, I would not recommend using this extension since it's
at its **alpha stage**.

You'll probably want to use [this extension instead](https://github.com/generalov/open-in-editor-vscode).

## Example

```
  "vim.otherModesKeyBindingsNonRecursive": [
    {
      "before": [
        "<leader>",
        "o",
        "u"
      ],
      "after": [],
      "commands": [
        {
          "command": "open-with.open",
          "args": ["emacsclient +{line}:{column} '{filename}'"]
        }
      ]
    }
  ]
```

## Release Notes

### 0.1.0

Initial alpha release.
