# Shrimp Heroes - Frontend Integration Guide

## ✅ What's Done

The frontend is now fully integrated using **Inertia.js** with Laravel. Clean, minimal, and ready to connect to your backend!

## 📁 File Structure

```
resources/js/pages/shrimp/
├── home.tsx          # Main dashboard with stats
├── report.tsx        # Report form for shrimp-saving actions
├── leaderboard.tsx   # Global leaderboard
└── guide.tsx         # Help & guide page
```

## 🌐 Routes

All routes are in `routes/web.php`:

| URL | Page | Purpose |
|-----|------|---------|
| `/shrimp` | Home | Main dashboard with global & user stats |
| `/shrimp/report` | Report | Form to submit shrimp-saving actions |
| `/shrimp/leaderboard` | Leaderboard | Top contributors |
| `/shrimp/guide` | Guide | How to help shrimp |

## 🔌 Backend Integration Points

### 1. **Home Page Stats** (`/shrimp`)
```php
Route::get('/', function () {
    return Inertia::render('shrimp/home', [
        'globalShrimpHelped' => Report::sum('shrimp_helped'),  // Replace mock data
        'userShrimpHelped' => auth()->user()?->reports->sum('shrimp_helped') ?? 0,
    ]);
})->name('shrimp.home');
```

### 2. **Submit Report** (`POST /shrimp/report`)
```php
Route::post('/report', function (Request $request) {
    $validated = $request->validate([
        'action_type' => 'required|string',
        'shrimp_helped' => 'required|integer|min:1',
        'location' => 'nullable|string',
        'description' => 'nullable|string',
    ]);

    Report::create([
        'user_id' => auth()->id(),
        ...$validated
    ]);

    return redirect()->route('shrimp.home')->with('success', 'Report submitted!');
});
```

### 3. **Leaderboard Data** (`/shrimp/leaderboard`)
```php
Route::get('/leaderboard', function () {
    $users = User::withSum('reports', 'shrimp_helped')
        ->orderByDesc('reports_sum_shrimp_helped')
        ->limit(10)
        ->get();

    return Inertia::render('shrimp/leaderboard', [
        'users' => $users->map(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'totalShrimpHelped' => $user->reports_sum_shrimp_helped,
            'country' => $user->country,
        ])
    ]);
})->name('shrimp.leaderboard');
```

## 🗄️ Suggested Database Schema

```php
// Migration: create_reports_table
Schema::create('reports', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('action_type'); // rescue, habitat, cleanup, education
    $table->integer('shrimp_helped');
    $table->string('location')->nullable();
    $table->text('description')->nullable();
    $table->timestamps();
});

// Add to users table
Schema::table('users', function (Blueprint $table) {
    $table->string('country')->nullable();
});
```

## 🚀 Running the App

```bash
# Start Laravel server
php artisan serve

# Visit in browser
http://127.0.0.1:8000/shrimp
```

For development with hot reload:
```bash
npm run dev
```

## 🎨 Tech Stack

- **Laravel 12** - Backend
- **Inertia.js v2** - Frontend/Backend bridge
- **React 19** - UI components
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety

## 📝 Notes

- All pages use Inertia.js (no separate React app)
- Forms use Inertia's `useForm` hook for easy backend submission
- Mock data is currently hardcoded - replace with real database queries
- No authentication required yet - add `auth` middleware when ready

## 🦐 That's it!

Keep it simple. Focus on the backend. The frontend is ready to receive your data!
