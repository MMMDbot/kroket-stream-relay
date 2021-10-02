import sys
from encode import startRelay

if __name__ == "__main__":
    startRelay(str(sys.argv[1]), str(sys.argv[2]), str(sys.argv[3]))
