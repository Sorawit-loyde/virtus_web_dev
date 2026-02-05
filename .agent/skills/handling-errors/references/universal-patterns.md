# Universal & System Patterns

## Pattern 1: Circuit Breaker
Prevent cascading failures in distributed systems by stopping requests to a failing service.

```python
class CircuitState(Enum):
    CLOSED = "closed"       # Normal
    OPEN = "open"          # Failing, reject
    HALF_OPEN = "half_open"  # Testing recovery

class CircuitBreaker:
    def call(self, func: Callable[[], T]) -> T:
        if self.state == CircuitState.OPEN:
            if datetime.now() - self.last_failure_time > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN")

        try:
            result = func()
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise
```

## Pattern 2: Error Aggregation
Collect multiple errors (e.g., validation) instead of failing on the first one.

```typescript
class ErrorCollector {
  private errors: Error[] = [];

  add(error: Error): void {
    this.errors.push(error);
  }

  throw(): never {
    if (this.errors.length === 1) throw this.errors[0];
    if (this.errors.length > 1) {
      throw new AggregateError(this.errors, `${this.errors.length} errors occurred`);
    }
  }
}
```

## Pattern 3: Graceful Degradation
Provide fallback functionality when errors occur.

```python
def with_fallback(
    primary: Callable[[], T],
    fallback: Callable[[], T]
) -> T:
    try:
        return primary()
    except Exception:
        return fallback()

# Usage
profile = with_fallback(
    primary=lambda: fetch_realtime_profile(id),
    fallback=lambda: fetch_cached_profile(id)
)
```
