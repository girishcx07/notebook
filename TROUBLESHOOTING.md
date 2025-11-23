# Troubleshooting Component Import Issues

## Issue
The components `EditPostDialog` and `DeletePostButton` appear to not be found, even though the files exist.

## Verification

All files are confirmed to exist:

```bash
✅ apps/client/app/posts/_components/create-post-form.tsx
✅ apps/client/app/posts/_components/edit-post-dialog.tsx
✅ apps/client/app/posts/_components/delete-post-button.tsx
✅ apps/client/app/posts/[id]/page.tsx
```

## Solutions

### 1. Restart Next.js Dev Server

The dev server might not have picked up the new files:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
pnpm dev
```

### 2. Restart TypeScript Server in VS Code

1. Open Command Palette (`Cmd+Shift+P`)
2. Type: "TypeScript: Restart TS Server"
3. Press Enter

### 3. Clear Next.js Cache

```bash
# Stop dev server, then:
rm -rf apps/client/.next
pnpm dev
```

### 4. Verify Import Paths

The imports in `apps/client/app/posts/[id]/page.tsx` are:

```typescript
import { EditPostDialog } from '../_components/edit-post-dialog';
import { DeletePostButton } from '../_components/delete-post-button';
```

These are correct relative imports from `[id]/page.tsx` to `_components/`.

### 5. Check for TypeScript Errors

Run type checking:

```bash
cd apps/client
pnpm tsc --noEmit
```

### 6. Manual Verification

Navigate to the page in your browser:

```
http://localhost:3000/posts
```

If the page loads but shows errors, check the browser console for specific error messages.

## Expected Behavior

When you navigate to `/posts/[id]`, you should see:
- ✅ Post title and content
- ✅ "Edit" button (from EditPostDialog)
- ✅ "Delete" button (from DeletePostButton)
- ✅ "Back to Posts" link

## If Still Not Working

Please share:
1. The exact error message you're seeing
2. Whether it's a TypeScript error in the IDE or a runtime error in the browser
3. Screenshot of the error if possible

The components are definitely there and correctly structured!
