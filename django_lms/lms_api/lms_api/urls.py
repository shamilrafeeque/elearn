
from re import template
from xml.dom.minidom import Document
from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('main.urls')),
    path('api-auth/',include('rest_framework.urls')),
    # path('api/token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    path('api/acounts/',include('accounts.urls')), 
    path('razorpay/', include('payments.urls')),
    path('documentation/',schema_view),

]+static(settings.STATIC_URL,document_root= settings.STATIC_ROOT)
