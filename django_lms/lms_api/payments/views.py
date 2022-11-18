from django.shortcuts import render
import json
import razorpay
from django.conf import settings
from .models import Order
from main.models import Course
# Create your views here.



def temp_payment(request):
    payment =0
    order=0
    s=0
    if request.method == 'POST':
        amount = request.POST.get('amount')
        name = request.POST['name']
        # username=request.POST['username']
        request.session['key'] = name
        print(name,'name')
        # print(username,'oooooooooooo')

        client =razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY,settings.RAZORPAY__SECRET_KEY))
        
        payment = client.order.create({"amount": int(400) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})
        print(payment,'this is payment')
        user = request.user
        print(user,'kkkkkkkkkkkkkkk')
        course=Course.objects.filter(id=name)
        print(course.values())
        s=course.values()
        if not Order.objects.filter(order_course_id=name,user=request.user,order_status=True).exists():
            
            order = Order.objects.create(order_course_id=name, 
                                        order_amount=amount, 
                                        user=request.user,
                                        order_id=payment['id'])
            payment['name']=name
            print(name,'kkkkkkkkkkkkkkkkkkkk')      
            print(order,'lllllllllllllllll')                                          
            print('***********')
        else:
            print("you are allresdy purchased course")
            return render(request,'purchase.html')
    context={
    'course':s,
    'payment':payment,
    'order':order,
    }
    # return render(request,'paymentz.html',{'payment':payment,'order':order})
    return render(request,'paymentz.html',context)



def paymentstatus(request):
    status =None
    response = request.POST
    # id = request.data['id']
    # print(id)

    print("ddd",response)

    params_dict = {
        'razorpay_order_id':response['razorpay_order_id'],
        'razorpay_payment_id':response['razorpay_payment_id'],
        'razorpay_signature':response['razorpay_signature']
    }

    client =razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY,settings.RAZORPAY__SECRET_KEY))

   
    status = client.utility.verify_payment_signature(params_dict)
    print(status,'ghg')
    try:
        order = Order.objects.get(order_id=response['razorpay_order_id'])
        order.order_payment_id  = response['razorpay_payment_id']
            
        order.isPaid = True
        order.order_status=True
        order.save()

    #     name = request.session['key']
    #     package = Packages.objects.get(id=name)
    #     print(package)
    #     package.stock -=1
    #     package.save()

    #     print(name,111112)
    #     #df
        return render(request,'success.html',{'status':True})
    except:
        return render(request,'success.html',{'status':False})