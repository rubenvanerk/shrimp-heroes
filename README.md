# Shrimp Heroes

A web application empowering activists to take peaceful action against shrimp cruelty at Aldi stores.

## Introduction

Shrimp Heroes helps coordinate and track peaceful protest actions at Aldi stores across Europe. Users can flip shrimp packages upside down to protest cruel farming practices (like eye-cutting and suffocation without stunning), report their actions with photo verification, and see the collective impact of the movement. Every package flipped helps approximately 34 shrimp per year in expectation.

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.2** or higher
- **Composer** (latest version recommended)
- **Node.js 18+** and **npm**
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shrimp-heroes
```

### 2. Run Setup

```bash
composer setup
```

This command will automatically:
- Install all dependencies
- Copy `.env.example` to `.env`
- Generate application key
- Run database migrations
- Install npm dependencies
- Build frontend assets

### 3. Configure API Keys

Add your OpenRouter API key to the `.env` file:

```
OPENROUTER_API_KEY=your_api_key_here
```

You can get an API key from [OpenRouter](https://openrouter.ai/).

### 4. Start Development Server

```bash
composer run dev
```

This will start the development environment with hot module replacement and the queue worker.

The application will be available at the URL shown in your terminal (typically `http://localhost:8000`).

**Note:** The queue worker processes action verifications asynchronously. When users submit actions with photos, the `VerifyActionJob` will analyze the images using AI to verify legitimacy, extract EXIF data, and check location/timestamp accuracy.

## Optional Setup Steps

### Import ALDI Store Data

If you have a CSV file containing ALDI store locations, you can import them:

```bash
php artisan stores:import resources/data/stores.csv
```

The CSV file should have the following columns:
- `place_id` (required)
- `name`
- `address`
- `city`
- `country`
- `lat` (latitude)
- `lon` (longitude)

You can specify a different file path:

```bash
php artisan stores:import path/to/your/stores.csv
```

### Seed the Database

To populate the database with sample data for development:

```bash
php artisan db:seed
```

## Development

### Running Tests

```bash
php artisan test
```

### Code Formatting

```bash
vendor/bin/pint
```

### Building for Production

```bash
npm run build
```
