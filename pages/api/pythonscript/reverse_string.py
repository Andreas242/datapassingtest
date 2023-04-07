import sys

def reverse_string(s):
    return s[::-1]

if __name__ == "__main__":
    input_string = sys.stdin.read().strip()
    reversed_string = reverse_string(input_string)
    print(reversed_string)
