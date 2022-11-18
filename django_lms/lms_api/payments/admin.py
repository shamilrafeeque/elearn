from django.contrib import admin

# Register your models here.
from .models import Order,AdminPercentage
class OrderAdmin(admin.ModelAdmin):
    model=Order
    list_display=('id','user','order_course','order_amount','isPaid','order_status')

class AdminPercentageadmin(admin.ModelAdmin):
    model=Order
    list_display=('id','order_id','Totalamount','percentage','adminPercentageamount')

    
admin.site.register(Order,OrderAdmin)
admin.site.register(AdminPercentage,AdminPercentageadmin)
