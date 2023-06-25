// @flow
// Original: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-one-dark.css

/**
 * One Dark colours (accurate as of commit 8ae45ca on 6 Sep 2018)
 * From colors.less
 * --mono-1: hsl(220, 14%, 71%);
 * --mono-2: hsl(220, 9%, 55%);
 * --mono-3: hsl(220, 10%, 40%);
 * --hue-1: hsl(187, 47%, 55%);
 * --hue-2: hsl(207, 82%, 66%);
 * --hue-3: hsl(286, 60%, 67%);
 * --hue-4: hsl(95, 38%, 62%);
 * --hue-5: hsl(355, 65%, 65%);
 * --hue-5-2: hsl(5, 48%, 51%);
 * --hue-6: hsl(29, 54%, 61%);
 * --hue-6-2: hsl(39, 67%, 69%);
 * --syntax-fg: hsl(220, 14%, 71%);
 * --syntax-bg: hsl(220, 13%, 18%);
 * --syntax-gutter: hsl(220, 14%, 45%);
 * --syntax-guide: hsla(220, 14%, 71%, 0.15);
 * --syntax-accent: hsl(220, 100%, 66%);
 * From syntax-variables.less
 * --syntax-selection-color: hsl(220, 13%, 28%);
 * --syntax-gutter-background-color-selected: hsl(220, 13%, 26%);
 * --syntax-cursor-line: hsla(220, 100%, 80%, 0.04);
 */

export const theme = {
  plain: {
    backgroundColor: 'hsl(220, 13%, 18%)',
    color: 'hsl(220, 14%, 71%)',
    fontSize: 13,
  },
  styles: [
    {
      style: {
        color: 'hsl(220, 10%, 40%)',
        fontStyle: 'italic',
      },
      types: ['comment', 'prolog', 'cdata'],
    },
    {
      style: {
        color: 'hsl(220, 14%, 71%)',
      },
      types: ['doctype', 'punctuation', 'entity'],
    },
    {
      style: {
        opacity: 0.8,
      },
      types: ['namespace'],
    },
    {
      style: {
        color: 'hsl(95, 38%, 62%)',
      },
      types: ['string', 'attr-value'],
    },
    {
      style: {
        color: 'hsl(207, 82%, 66%)',
      },
      types: ['punctuation', 'operator'],
    },
    {
      style: {
        color: 'hsl(29, 54%, 61%)',
      },
      types: [
        'attr-name',
        'class-name',
        'boolean',
        'constant',
        'number',
        'atrules',
      ],
    },
    {
      style: {
        color: 'hsl(286, 60%, 67%)',
      },
      types: ['keyword'],
    },
    {
      style: {
        color: 'hsl(355, 65%, 65%)',
      },
      types: ['property', 'tag', 'symbol', 'deleted', 'important'],
    },
    {
      style: {
        color: 'hsl(95, 38%, 62%)',
      },
      types: [
        'selector',
        'string',
        'char',
        'builtin',
        'inserted',
        'regex',
        'attr-value',
      ],
    },
    {
      style: {
        color: 'hsl(207, 82%, 66%)',
      },
      types: ['function', 'variable', 'operator'],
    },
    {
      style: {
        color: 'hsl(187, 47%, 55%)',
      },
      types: ['url'],
    },
    // css overrides
    {
      style: {
        color: 'hsl(355, 65%, 65%)',
      },
      types: ['selector'],
    },
    {
      style: {
        color: 'hsl(220, 14%, 71%)',
      },
      types: ['property'],
    },
    {
      style: {
        color: 'hsl(187, 47%, 55%)',
      },
      types: ['function'],
    },
    {
      style: {
        color: 'hsl(95, 38%, 62%)',
      },
      types: ['url'],
    },
    {
      style: {
        color: 'hsl(286, 60%, 67%)',
      },
      types: ['important', 'atrule', 'rule'],
    },
    // js overrides
    {
      style: {
        color: 'hsl(286, 60%, 67%)',
      },
      types: ['operator'],
    },
    // json overrides
    {
      style: {
        color: 'hsl(220, 14%, 71%)',
      },
      types: ['operator'],
    },
    // general
    {
      style: {
        fontWeight: 'bold',
      },
      types: ['bold'],
    },
    {
      style: {
        fontStyle: 'italic',
      },
      types: ['comment', 'italic'],
    },
    {
      style: {
        cursor: 'help',
      },
      types: ['entity'],
    },
  ],
}
