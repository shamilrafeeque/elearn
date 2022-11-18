from . import views
from django.urls import path

urlpatterns = [
    path('payments/', views.temp_payment, name="payy"),
    path('paystatus/', views.paymentstatus, name="status"),
    
  
    
]