# OpenWith

Allow to open the current file in any program.

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

## Known Issue

It assumes that the command will be executed from the vim extension with valid
arguments. At this point, I would not recommend using this extension since it's
at its alpha stage.

## Release Notes

### 0.0.1

Initial release.
