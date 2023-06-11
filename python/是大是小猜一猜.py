# author: Tomboy

"""
    猜大小游戏，考虑到仅使用了初级基础，这里就不封装成函数了，有兴趣的小伙伴可以去实现
        1.指定次数或者无限次数的猜大小游戏
        2.封装成函数的形式去实现（骰子结果生成、结果判断，结果输出）
"""

import random

choice = input("请输入大或小：").lower()

if choice not in ["大", "小", "da", "xiao", 'big', 'small']:
    print("输入错误，请重新输入")
    exit()

point1 = random.randrange(1, 7)
point2 = random.randrange(1, 7)  # 1 <= point2 <= 6
point3 = random.randrange(1, 7)

sum = point1 + point2 + point3
result = None

if 11 <= sum <= 18:
    result = "大"
elif 3 <= sum <= 10:  # 3 <= sum and sum <= 10
    result = "小"

if choice in ["大", "da", "big"] and result == "大" or choice in ["小", "xiao", "small"] and result == "小":
    print("恭喜你猜对了，结果是：", [point1, point2, point3], "<==> ", result)
else:
    print("很遗憾，你猜错了，结果是：", [point1, point2, point3], "<==> ", result)
