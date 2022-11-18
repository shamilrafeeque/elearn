from dataclasses import fields
import imp
from urllib import request
from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from main.models import Course

class AccountSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Account
        fields=['id','username','email','password','bio','mobile','interests','is_active','is_superuser','last_login','joined_date',]
    
    def get_name(self,obj):
        name=obj.username
        return name

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        # Adding the below line made it work for me.
        instance.is_active = False
        if password is not None:
            # Set password does the hash, so you don't need to call make_password 
            instance.set_password(password)
        instance.save()
        return instance
                
                
class VerifyOtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ['is_active']    
        
        
class RecomentedCourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Course
        fields=['id','category','teacher','title','description','featured_img','techs']   
    # def save(self):
    #     reg = models.Account(
            
    #         email=self.validated_data['email'],
    #         username=self.validated_data['username'],
    #     )
    #     password=self.validated_data['password']
    #     reg.set_password(password)
    #     reg.save()
    #     return reg

        
        

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     print('888888888888888888')
    # data=request.data
    # user=models.Account.objects.get(data=data)
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #     # token['is_staff'] = user.is_staff
    #     # token['is_superuser'] = user.is_superuser
    #     if user.is_active==True:
    #         print(token)
    #         return token
    #     else:
    #         return Response('The user is not active')
    
    # @classmethod
    # def get_token(cls, user):
    #     print("555555555555555555")
    #     # token = super().get_token(user)
    #     token=get_token(user)
    #     # Add custom claims
    #     token['username'] = user.username
    #     # token['email'] = user.email
    #     # # token['wallet_balance'] = user.wallet_balance
    #     # token['is_superuser'] = user.is_superuser
    #     # # token['mobile'] = user.mobile
        
    #     return token
  