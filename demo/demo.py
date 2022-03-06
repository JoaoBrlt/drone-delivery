import argparse
from pynput import keyboard
from first_demo import first_demo
from second_demo import second_demo


demo = 1
step = 0


def on_press(key):
    global step
    if key == keyboard.Key.right:
        if demo == 1:
            first_demo(step)
        else:
            second_demo(step)
        step += 1


def main():
    global demo
    parser = argparse.ArgumentParser(description='Performs the demonstrations')
    parser.add_argument('-n', type=int, help='the demo to be executed', required=True)
    args = parser.parse_args()
    demo = args.n

    with keyboard.Listener(on_press=on_press) as listener:
        listener.join()


main()
