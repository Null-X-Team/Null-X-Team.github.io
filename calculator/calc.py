import math

def calculate(expression):
    """
    Evaluates a math expression string using Python.
    """
    try:
        # Safe evaluation context with built-in math module functions
        allowed_globals = {
            "math": math,
            "abs": abs,
            "round": round,
            "pow": pow,
            "sqrt": math.sqrt,
            "sin": math.sin,
            "cos": math.cos,
            "tan": math.tan,
            "pi": math.pi,
            "e": math.e
        }
        
        result = eval(expression, allowed_globals)
        return f"= {result}"
    except Exception as e:
        return f"[Math Error]: {type(e).__name__}"
