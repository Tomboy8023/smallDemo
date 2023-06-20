# author：Tomboy

import turtle

color_list = ['orange', 'red', 'yellow', 'blue', 'green', 'purple']
t = turtle.Pen()
t.pensize(3)
t.speed(0)

for i in range(810):  # 绘制的次数
    t.color(color_list[i % 6])
    t.forward(i)
    t.left(59)

turtle.done()
