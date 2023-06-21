import turtle
import random

t = turtle.Pen()
t.shape("turtle")
t.pensize(3)
r_list = [x for x in range(30, 330, 30)]
color_list = ['red', 'skyblue', 'orange', 'yellowgreen', 'green', 'blue', 'purple', 'black', 'gray']
for r in r_list:
    t.color(random.choice(color_list))
    t.circle(r)
    t.up()
    t.goto(0, -r)
    t.down()

turtle.done()
