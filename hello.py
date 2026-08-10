# demonstrating intersection growth and union groth

def PrintIntersection(var1, var2):
    print(var1&var2)
def PrintUnion(var1, var2):
    print(var1|var2)

x1 = {1,2,3,4,5,6,7}
x2 = {4,5,6,7,8,9}
y1=8
y2=10
for i in range(1,101):
     x1 = x1|{y1}
     x2 = x2|{y2}
     print("Print Intersection")
     PrintIntersection(x1,x2)
     print("Print Union")
     PrintUnion(x1,x2)
     y1=y1+1
     y2=y2+1
