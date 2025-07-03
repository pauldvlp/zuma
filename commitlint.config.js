import gitCommitEmoji from 'commitlint-config-git-commit-emoji'

const { rules } = gitCommitEmoji

export default {
  extends: ['git-commit-emoji'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        '🔖 chore',
        ...rules['type-enum'].pop()
      ]
    ]
  }
}
