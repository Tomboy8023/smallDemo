def getPosition(x, y):
    if(x > 0 and y > 0):
        return "第一象限"
    elif(x < 0 and y > 0):
        return "第二象限"
    elif(x < 0 and y < 0):
        return "第三象限"
    elif(x > 0 and y < 0):
        return "第四象限"
    elif(x == 0):
        if(y == 0):
            return "原点"
        return "y轴"
    else:
        return "x轴"


if __name__ == "__main__":
    for x in range(-3, 4):
        for y in range(-3, 4):
            print(f"x={x}, y={y}, 位置是：{getPosition(x, y)}")
