# Health Watchers

A healthcare management platform for patient tracking, encounters, and payment processing.

## Features

- 👥 Patient Management - CRUD operations for patient records
- 📋 Encounter Tracking - Track patient visits and encounters
- 💳 Payment Processing - Stellar blockchain integration for payments
- 🔐 Authentication - JWT-based secure authentication
- 🌍 Internationalization - Multi-language support (EN/FR)
- 🎨 Design System - Comprehensive UI component library

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Seed the database
npm run seed

# Start development servers
npm run dev
```

## Project Structure

```
health-watchers/
├── apps/
│   ├── api/          # Backend API
│   ├── web/          # Next.js frontend
│   └── stellar-service/  # Payment service
├── scripts/          # Utility scripts
└── docs/            # Documentation
```

## Development

### Available Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all packages
- `npm run lint` - Run linting
- `npm run seed` - Seed the database
- `npm run changeset` - Create a changeset for versioning

### Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

#### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(patients): add search functionality
fix(auth): resolve token refresh issue
docs(readme): update installation steps
```

#### Creating Changesets

For user-facing changes, create a changeset:

```bash
npm run changeset
```

See [docs/VERSIONING.md](./docs/VERSIONING.md) for more details.

## Versioning

This project uses [Semantic Versioning](https://semver.org/) and maintains a [CHANGELOG.md](./CHANGELOG.md) following the [Keep a Changelog](https://keepachangelog.com/) format.

## License

[Add your license here]

## Support

For issues and questions, please open an issue on GitHub.
