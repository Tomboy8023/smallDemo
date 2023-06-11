# author：Tomboy

import turtle

turtle.pensize(10)  # 设置笔头粗细

"""画第一行左侧的圆"""
turtle.penup()  # 抬笔
turtle.goto(-220, 0)  # 移动笔头的位置
turtle.pendown()  # 落笔
turtle.pencolor("blue")  # 设置画笔的颜色
turtle.circle(100)  # 画半径为100的圆

"""画第一行中间的圆"""
turtle.penup()
turtle.goto(0, 0)
turtle.pendown()
turtle.pencolor("black")
turtle.circle(100)

"""画第一行右侧的圆"""
turtle.penup()
turtle.goto(220, 0)
turtle.pendown()
turtle.pencolor("red")
turtle.circle(100)

"""画第二行左侧的圆"""
turtle.penup()
turtle.goto(-110, -110)
turtle.pendown()
turtle.pencolor("yellow")
turtle.circle(100)

"""画第二行右侧的圆"""
turtle.penup()
turtle.goto(110, -110)
turtle.pendown()
turtle.pencolor("green")
turtle.circle(100)

turtle.done()  # 暂停 海龟绘图 退出
