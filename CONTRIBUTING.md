# Contributing to Health Watchers

Thank you for your interest in contributing to Health Watchers! This document provides guidelines for contributing to the project.

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This leads to more readable messages and enables automated changelog generation.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (white-space, formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

### Examples

```bash
feat(patients): add patient search functionality
fix(auth): resolve token refresh race condition
docs(changelog): add versioning strategy documentation
refactor(api): simplify error handling middleware
```

### Breaking Changes

Breaking changes should be indicated by a `!` after the type/scope and explained in the footer:

```bash
feat(api)!: change patient API response structure

BREAKING CHANGE: Patient API now returns nested address object instead of flat structure
```

## Changelog Management

This project uses [Changesets](https://github.com/changesets/changesets) for changelog management.

### Creating a Changeset

When you make changes that affect users, create a changeset:

```bash
npm run changeset
```

Follow the prompts to:
1. Select which packages have changed
2. Choose the version bump type (major, minor, patch)
3. Write a summary of the changes

This creates a markdown file in `.changeset/` that will be used to update the changelog and version on release.

### Version Bump Guidelines

- **Major (1.0.0)**: Breaking changes that require user action
- **Minor (0.1.0)**: New features that are backward compatible
- **Patch (0.0.1)**: Bug fixes and minor improvements

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the commit convention
3. Create a changeset if your changes affect users
4. Ensure all tests pass and linting is clean
5. Submit a pull request with a clear description
6. Wait for review and address any feedback

## Release Process

Releases are automated via GitHub Actions:

1. When PRs are merged to `main`, changesets are collected
2. A "Version Packages" PR is automatically created
3. When the Version Packages PR is merged, a new release is published
4. GitHub Release notes are generated from the changelog

## Questions?

If you have questions about contributing, please open an issue for discussion.
