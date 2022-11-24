from django.contrib import admin

from .models import Account

class AccountAdmin(admin.ModelAdmin):
    model = Account
    list_display = ('username', 'email', 'mobile','wallet_balance','interests','is_staff','is_verified','is_active','last_login','joined_date') 
    
    readonly_fields = ('last_login','joined_date','password')
    ordering = ('joined_date', )
    filter_horizontal =()
    list_filter = ()
    fieldsets =()

# Register your models here.

admin.site.register(Account,AccountAdmin)



