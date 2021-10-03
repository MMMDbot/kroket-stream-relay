import sys
from encode import startQueue, startRelay, stop

if __name__ == "__main__":
    if str(sys.argv[1]) == "ingest":
        startQueue(str(sys.argv[2]), str(sys.argv[3]))
    elif str(sys.argv[1]) == "relay":
        startRelay(
            str(sys.argv[2]), str(sys.argv[3]), str(sys.argv[4]), str(sys.argv[5])
        )
    elif str(sys.argv[1]) == "stop":
        stop(str(sys.argv[2]))
