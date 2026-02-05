# Core Concepts & Best Practices

## 1. Error Handling Philosophies
**Exceptions vs Result Types:**
- **Exceptions**: Traditional try-catch, disrupts control flow (Java, Python). Use for unexpected errors or exceptional conditions.
- **Result Types**: Explicit success/failure return values (Rust, Go, Elm). Use for functional approaches, expected errors, and validation failures.
- **Error Codes**: C-style integer returns. Requires discipline; generally discouraged in modern high-level languages.
- **Option/Maybe Types**: For nullable values (finding a record that might not exist).

**Panic vs Crash:**
- **Panics/Crashes**: Unrecoverable errors or programming bugs (e.g., array index out of bounds).

## 2. Error Categories
**Recoverable Errors:**
- Network timeouts
- Missing files (that can be re-created or ignored)
- Invalid user input
- API rate limits

**Unrecoverable Errors:**
- Out of memory
- Stack overflow
- Programming bugs (null pointer referencing)

## 3. Best Practices
- **Fail Fast**: Validate input early, fail quickly before expensive operations.
- **Preserve Context**: Include stack traces, metadata, and timestamps in logs.
- **Meaningful Messages**: Explain *what* happened and *how* to fix it.
- **Log Appropriately**: 
    - Unexpected Error = Log (Error level)
    - Expected Failure (Validation) = Don't spam logs (Info/Debug level)
- **Handle at Right Level**: Catch only where you can meaningfully handle or wrap the error.
- **Clean Up Resources**: Use `try-finally`, `defer`, or context managers.
- **Don't Swallow Errors**: Never use empty `catch` blocks. Log or re-throw.
- **Type-Safe Errors**: Use typed custom errors when possible for better handling.

## 4. Common Pitfalls
- **Catching Too Broadly**: `except Exception:` hides bugs and makes debugging impossible.
- **Empty Catch Blocks**: Silently swallowing errors leads to "ghost bugs".
- **Logging and Re-throwing**: Creates duplicate log entries for the same error. Log at the source OR the handler, not both (unless wrapping).
- **Not Cleaning Up**: Forgetting to close files/connections causes resource leaks.
- **Poor Error Messages**: "Error occurred" gives no clues.
- **Ignoring Async Errors**: Unhandled promise rejections can crash Node.js processes.
