import jwt
from datetime import datetime,timedelta
from rest_framework.authentication import get_authorization_header,BaseAuthentication
from .models import Tutors
from rest_framework import exceptions

class JWTTutorAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        print('*********************************')
        print(auth)
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            print('9999999999999999999999')
            print(token)
            print('8888888888888888888888')
            id = decode_access_token(token)

            tutor = Tutors.objects.get(pk=id)
            return (tutor, None)
        raise exceptions.AuthenticationFailed('unauthenticated')


def create_access_token(id):
    return jwt.encode({
        'tutor_id':id,
        'exp':datetime.utcnow()+timedelta(seconds=2800),
        'iat':datetime.utcnow(),
        
        # 'teacher_id':Tutors.id,
        
    },'access_secret',algorithm='HS256')
    
    
def decode_access_token(token):
    try:
        payload = jwt.decode(token,'access_secret',algorithms='HS256')
        return payload['tutor_id']
    except Exception as e:
        print(e)
        raise exceptions.AuthenticationFailed('unauthenticated')


  
def create_refresh_token(id):
    return jwt.encode({
        'user_id':id,
        'exp':datetime.utcnow()+timedelta(days=30),
        'iat':datetime.utcnow()
        
    },'refresh_secret',algorithm='HS256')
    
    
def decode_refresh_token(token):
    try:
        payload = jwt.decode(token,'refresh_secret',algorithms='HS256')
        return payload['tutor_id']
    except:
        raise exceptions.AuthenticationFailed('unauthenticated')