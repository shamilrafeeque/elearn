from asyncio import exceptions
from logging import exception
from tkinter import N

from django.contrib.auth.hashers import check_password
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import exceptions, generics, status
from rest_framework.authentication import get_authorization_header
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .authentication import (JWTTutorAuthentication, create_access_token,
                             create_refresh_token)
from .models import (Assignments, Chapter, Course, CourseCategory, Quiz,
                     QuizQuestions, Tutors,Certificate,PostCertificate)
from .serializers import (AssignmentSerializer, CategorySerializer,
                          ChapterSerializer, CourseSerializer,
                          QuizQuestionSerializer, QuizSerializer,
                          TeacherSerializer, serializers,PostCertificateSerializer,teachercheckcertificateserializers)


class TutorRegisterView(APIView):
    def post(self,request):
        data = request.data
        serializer = TeacherSerializer(data=data)
        
        if serializer.is_valid():
                serializer.save()
                print("@@@@@*************************")
                print(serializer.data)

                response={
                    "messages" : "User Created Successfully",
                    "data" : serializer.data
                }
                
                return Response(data= response, status = status.HTTP_201_CREATED)
            
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LoginAPIViews(APIView):
    def post(self,request):
        email=request.data['email']
        password=request.data['password']
        
        
        tutor=Tutors.objects.filter(email=email).first()
        
        if tutor is None:
            raise exceptions.AuthenticationFailed('invalid credentials')
        
        if not tutor.check_password(password):
            raise exceptions.AuthenticationFailed('invalid credentials')
        
        access_token=create_access_token(tutor.id)
        refresh_token=create_refresh_token(tutor.id)
        print(tutor)
        print(tutor.id)
        print('[[[[[[[[[[[[[[[[[[[[[')
        
        response=Response()
        
        response.set_cookie(key='refresh_token',value=refresh_token,httponly=True)
        
        response.data={
            'token':access_token,
            'refresh':refresh_token
        }
        return response
        
        # serializers=TeacherSerializer(tutor)
        
        # return Response(serializers.data)



class AllTutorAPIView(APIView):
    permission_classes = [IsAdminUser]
    # authentication_classes = [JWTTutorAuthentication]
    # def get(self,request):
    #     return Response(TeacherSerializer(request.user).data)
    def get(self, request, format=None):
        users = Tutors.objects.all()
        serializer = TeacherSerializer(users, many=True)
        return Response(serializer.data)
    
    
class CategoryList(generics.ListCreateAPIView):
    authentication_classes = [JWTTutorAuthentication]
    queryset=CourseCategory.objects.all()
    serializer_class=CategorySerializer
    

@api_view(['POST'])
@authentication_classes([JWTTutorAuthentication])
def addCourse(request):
    data=request.data
    tutor5=request.user
    print('//////////////////////////////////////')
    print(tutor5)
    
    
    print(';;;;;;;;;;;;;;;;;;;;;;;;;')
    print(data)
    print(';;;;;;;;;8888888888888888888888888888888888888888;;;;;;;;;;')
    teacher=data['teacher']
    print(teacher)
    print(tutor5.id)
    print('+++++++++++++++++++++++++++++++++++++')
    ans=Tutors.objects.get(id=teacher)
    print(ans)
    print('------------------------')
    print(ans.full_name)
    print(tutor5)
    print('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    # try:
    print('its add couse by tutor')
    # try:
    # if ans.full_name==tutor5:
    # if 1==1:
    if str(tutor5.id)==str(teacher):
        print('trrrrrrrrrrrrrrrrrrrryyyyyyyyyyyyyyyyy')
        serializer = CourseSerializer(data=data)
        print('******************************')
        print(serializer)
        if serializer.is_valid():
            
            serializer.save()
            message = {'detail':'course booked Successfuly'}
        # return Response(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("please choose correct category")
    else:
        return Response('you are not allowed')
        




class CourseList(APIView):
    authentication_classes = [JWTTutorAuthentication]
    def get(self,request,id):
        tutor=request.user
        print(tutor)
        setj=tutor.id
        ss=id
        print(ss,'\U0001F910')
        print(setj)
        print('********************')
        print(tutor,'uuuuuuuuuuuuuuuuu') 
        L=Tutors.objects.get(id=id)
        print(L,'kkkkkkkkkkkkkkkkk')
        if tutor==L:
            try:       
                queryset=Course.objects.filter(teacher=tutor)
                print(queryset)
                serializer = CourseSerializer(queryset,many=True)
                print('***********************')
                print(serializer.data)
                print('88888888888888888888888')
                return Response(serializer.data)
                # serializer = ChapterSerializer(queryset,many=True)
                # return Response(self.serializer, status=status.HTTP_200_OK)
            except:
                message = {'detail':'the user no course List'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message={"details":"please add the curroct information"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PATCH'])
@authentication_classes([JWTTutorAuthentication])      
def UpdateCourselist(request,id):
        tutor6 = request.user
        print(tutor6,'data')
        print(tutor6.id)
        data=request.data
        print(data)   
        data['teacher']=tutor6.id   
        print('*****************',data,'***************************')
        # teachers=data['teacher']
        # print(teachers,'qqqqqqqqqqqqqqqqqqqqqqq')
        qury=Course.objects.get(id=id)
        print(qury,'uuuuuuuuuu')
        print(qury.teacher,'kkkkkkkkkkkkkkkkkkk')
        if qury.teacher==tutor6:
            serializer=CourseSerializer(instance=qury,data=data,partial=True)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                message = {'detail':'course updata Successfuly'}
                print(message)
    
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                message = {'detail':'please add correct id'}
                return Response(message,status=status.HTTP_404_NOT_FOUND)
        else:
            message = {'detail':'The coures is not yours'}
            return Response(message,status=status.HTTP_404_NOT_FOUND)
            # teachers=Course.objects.filter(teacher=tutor6)
            # print(teachers,'kkkkkkkkkkkkkkkkkkkkkk')
            # s=teachers.values()
            # print(s,'+++++++++++++++++++++++++')
            # quersetdata=teachers.values_list('id')
            # print(quersetdata,'query set data')
            # ans=[]
            # for x in quersetdata:
            #     print(x,'000000')
            
            #     li=list(x)
            #     print(type(li))
            #     print(li)
            #     print(type(x))
            #     ans.append(x)
            # print(ans,'array append')
            # for i in li:
            #     print(li)
            #     print(type(id),'llllllllllllllll')
            # tp=type(x)
          
            # sk=type(id)
            # print(sk)
            # print(str(li),'kkkkkkkkkkkkkkkk')
            # print(str(id),'kkkkkkkkkkkkkk')
            # print(type(ans))
            # if [ans]==[id]:
            #     if teachers:
            #         try:
            #             c=Course.objects.get(id=id)
                    
                        
            #             print(c,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
            #             print(str(tutor6.id),']]]]]]]]]]]]]]]]]]]]')
            #             # print(str(teachers))
            #             teachers=data['teacher']
            #             print(teachers,'qqqqqqqqqqqqqqqqqqqqqqq')
            #             if str(tutor6.id)==teachers:
            #                 print(';;;;;;;;;;;;;;;;;;;;;')
                #             serializer=CourseSerializer(instance=c,data=data,partial=True)
                #             print(serializer)
                #             if serializer.is_valid():
                #                 serializer.save()
                #                 message = {'detail':'course updata Successfuly'}
                #                 print(message)
                    
                #                 return Response(serializer.data, status=status.HTTP_200_OK)
                #         else:
                #             message = {'detail':'teacher id is diffent'}
                #             return Response(message,status=status.HTTP_404_NOT_FOUND)
                #     except:
                #         return Response('course updation is not working')
                # else:
                #     message = {'detail':'i love you'}
                #     return Response(message,status=status.HTTP_404_NOT_FOUND)
        #     else:
        #         message = {'detail':'please add correct id'}
        #         return Response(message,status=status.HTTP_404_NOT_FOUND)
        # else:
        #     message = {'detail':'The coures is not yours'}
        #     return Response(message,status=status.HTTP_404_NOT_FOUND)
  
@api_view(['DELETE'])
@authentication_classes([JWTTutorAuthentication])         
def deleteCourse(request,id):
    tutors=request.user
    print('**************************')
    print(tutors,'delete')
    print(tutors.id)
    try:
        s=Course.objects.get(id=id)
        print(s,'kkkkkkkkkkkkkkkkk')
        print(s.teacher)
        if s.teacher==tutors:
       
            course=get_object_or_404(Course,id=s.id)
            print(course)
            if tutors.id:
                print('hello')
                course.delete()
                return Response('Course delete successfully')
            else:
                return Response(status=status.HTTP_202_ACCEPTED)
        else:
            print('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
            message={'the course is not yours'}
            return Response(message)
    except:
        message={'course is not found'}
        return Response(message)
    
    
    
      

        
    

    
    
#chapter api_view
class ChapterList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    
    

@api_view(['POST'])
@authentication_classes([JWTTutorAuthentication])
def addChapter(request):
    data=request.data
    tutor=request.user
    try:
        crs=Course.objects.get(id=data['course'])
        print(crs,'kkkkkkkkkkkkkkkkkkkkkkkkk')
        print(tutor)
        print(crs.teacher)
        
        if tutor==crs.teacher:
            if not Chapter.objects.filter(course=crs,title=data['title'],no=data['no']).exists():
            
                if crs.teacher==tutor:
                    print('**********************')
                    serializer=ChapterSerializer(data=data)
                    print(serializer)
                    print("PPPPPPPPPPPPPPP")
                    if serializer.is_valid():
                        print('88888888888888888888')
                        serializer.save()
                        print("ssssssssssssavve")
                        message = {'detail':'course booked Successfuly'}
                    # return Response(serializer.data)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response('The course is not yours')
            else:
                return Response('The number of chapter is allredy exists')
        else:
            return Response('The couse is not yours')
    except:
        return Response('unfound data')
        
    
    

    
@api_view(['PATCH'])
@authentication_classes([JWTTutorAuthentication])      
def UpdateChapterlist(request,id):
    tutor=request.user
    print(tutor.id,'mmmmmmmmmmmmmm')
    data=request.data
    # tutor=request.user
    # print(tutor,'tutor')
    # data=request.data
    # print(data,'data')
    # chapter=data['course']
    # print(chapter,'delete')
    # c=Chapter.objects.get(id=id)
    # print(c)
    try:
        c=Chapter.objects.get(id=id)
        print(c,'cccccccccccccccc')
        u=c.course.teacher
        print(u,'hhhhhhhhhhhhhhhhhh',request.user)
        # chapt=Chapter.objects.filter(course=data['course'])
        
        # print(type(chapt),chapt,'chapttttttttttttttt')
        # print(chapt)
        # print(type(c),c)
        
        print(u,'oooooooo',request.user)
        if u==request.user:
            print('**********')
            # cha=Chapter.objects.filter(course=data['course'])
            # print(cha[0].id,'jjjjjjjjjjj')
            
        
            # # if cha==c:
            # c=Chapter.objects.get(id=id)
            serializer=ChapterSerializer(instance=c,data=data,partial=True)
            print(serializer)
            if serializer.is_valid():
                    serializer.save()
                    message = {'detail':'chapter updated Successfuly'}
            # return Response(serializer.data)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response('chapter updation is not working')
            # else:
            #     return Response('The chapter is not yours')
    
        else:
            return Response('this course is not yours')
    except:
        return Response("not found data")
   
@api_view(['DELETE'])
@authentication_classes([JWTTutorAuthentication])  
def deleteChapter(request,id):
    print('*************************')
    user=request.user
    print(user)
    chapter=get_object_or_404(Chapter,id=id)
    u=chapter.course.teacher
    print(u,'kkkkkkkkkkkkkkkkkkkkkkkkk')
    if u==user:
    
        if request.user.id and id:
            chapter.delete()
            return Response('Chapter Deleted Successfully')
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response('The chapter is not yours')
    
        

@api_view(['POST'])
@authentication_classes([JWTTutorAuthentication])
def addAssignments(request):
    try:
        tutor=request.user
        print('ooooooooooooooooooooooooo')
        print(tutor)
        tutorid=tutor.id
        print('[[[[[[[[[[[[[[')
        print(type(tutorid))
        print(']]]]]]]]]]]]]]]')
        datas=request.data
        print(request.data)
        s=request.data['tutor']
        print(s)
        print('**********************')
        print(type(s))
        print('**********************')
        if str(tutorid)==str(s):
            serializer=AssignmentSerializer(data=datas)
            print(serializer)
            
            
            print(';;;;;;;;;;;')
            if serializer.is_valid():
                print('llllllllllllllllllllll')
                serializer.save()
            
                print(serializer.data)
                message = {'detail':'course booked Successfuly'}
                print(';;;;;;;;;;;')
                return Response(serializer.data,status=status.HTTP_404_NOT_FOUND)
            else:
                return Response("please add correct chapter")
        else:
            return Response('you are not allowed to add assignments')
    except:
        return Response('not found the data')      

        
@api_view(['PATCH'])
@authentication_classes([JWTTutorAuthentication])    
def UpdateAssignments(request,id):
    tutor=request.user
    print(tutor.id,'tutor')
    data=request.data
    print(data['tutor'],'datatutor')
    chapter=get_object_or_404(Assignments,id=id)
    u=chapter.chapter.course.teacher
    print(u)
    Assignment=Assignments.objects.get(id=id)
    print(Assignment)
    if u==tutor:
    # if tutor.id and Assignment:
        serializer=AssignmentSerializer(instance=Assignment,data=data)
        print('kkkkkkkkkkk')
        if serializer.is_valid():
                serializer.save()
                message = {'detail':'Assignments updated Successfuly'}
        # return Response(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("please add correct tutor id")
    else:
        return Response('Assignments updation is not working')
        

@api_view(['DELETE'])
@authentication_classes([JWTTutorAuthentication])  
def deleteAssignments(request,id):
    user=request.user
    assignments=get_object_or_404(Assignments,id=id)
    chapter=get_object_or_404(Assignments,id=id)
    u=chapter.chapter.course.teacher
    print(u)
    if user==u:
        assignments.delete()
        return Response('Assignments Deleted Successfully')
    else:
        return Response("The Assignments is not yours",status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
# @authentication_classes([JWTTutorAuthentication]) 
def getAssignments(request,id):
    getAssign=Assignments.objects.filter(id=id)
    serializer=AssignmentSerializer(getAssign,many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
@authentication_classes([JWTTutorAuthentication]) 
def allAssignments(request,id):
    tutors=request.user.id
    t=request.user
    print(tutors,'LLLLLLLLLLLLLLLLLL')
    chapter=get_object_or_404(Assignments,id=id)
    print(chapter,'gggggggggggg')
    u=chapter.chapter.course.teacher
    print(u)
    if u==request.user:
        print('lllllllllllllll')
        assignment=Assignments.objects.filter(id=id)
        print(assignment)
        print('***************')
        serializer=AssignmentSerializer(assignment,many=True)
        return Response(serializer.data)
    else:
        return Response("You are not allowed")
    
    
#quiz sectopn 
@api_view(['POST'])
@authentication_classes([JWTTutorAuthentication])
def addQuiz(request,id):
    data=request.data
    tutor=request.user
    print(tutor,'yyyy')
    ids=request.data['course']
    print(id)
    print(type(id))
    print(type(ids))
    print(ids)
    if str(ids)==str(id):
        crs=Course.objects.get(id=id)
        
        print(crs.teacher,'couse')
        print(data['course'])
        # s=Quiz.objects.get(course=data['course'])
        # print(s,'kkkkkkkkkkkkkk')
        if not Quiz.objects.filter(course=data['course']).exists():
            print('00000000000000')
            if not Quiz.objects.filter(title=data['title']).exists():
                print(type(request.data['teacher']))
                print(type(crs.teacher.id))
                if crs.teacher==tutor and (int(request.data['teacher'])==crs.teacher.id):
                                
                    serializer=QuizSerializer(data=data)
                    print(serializer)
                    
                    if serializer.is_valid():
                        serializer.save()
                        
                    return Response(serializer.data, status=status.HTTP_200_OK)
                
                else:
                    return Response('this course not in your course list')
            else:
                    return Response('not allowed,title allredy added')
        else:
            return Response("allready added quiz")
    else:
        return Response("miss matches courses")
        

    
@api_view(['POST'])
@authentication_classes([JWTTutorAuthentication])
def assignQuiz(request,id):
    data=request.data
    print(type(data['number']),'ooooooooooooooo')
    tutor=request.user
    print(tutor)
    if str(id)==str(data['quiz']):
        quiz=Quiz.objects.get(id=id)
        
        print(quiz.teacher)
        print(type(quiz.teacher))
        print(type(tutor))
        print(list[(quiz.teacher)])
        
        if not QuizQuestions.objects.filter(questions=data['questions']).exists():
            if not QuizQuestions.objects.filter(number=data['number']).exists():
            
                print('???????????????????')
                if quiz.teacher==tutor:
                    print('************')
                                
                    serializer=QuizQuestionSerializer(data=data)
                    print(serializer)
                    
                    if serializer.is_valid():
                        serializer.save()
                        
                    return Response(serializer.data,status=status.HTTP_200_OK)
                
                else:
                    return Response('this course not in your course list')
            else:
                return Response('The question number is allredy added')
        else:
                return Response('The question is allredy added')
    else:
        return Response("miss matches quiz")
    # except:
    #     return Response("matching query does not exist")
    
@api_view(['POST'])
# @authentication_classes([JWTTutorAuthentication])
def Postcertificate(request):
    data=request.data
    print(data)
    user=data['certicate']
    crse=data['course']
    print(crse,';;;;;;;;;;;;;;')
    print(crse,'kkkkkkkkkkkkkkkkkkk')
    print(user)
    print('lerrrrrrrrrrr')
    try:
        kk=Certificate.objects.get(course=crse)
        print(kk,'lllllllllllllllll')
        if kk:
            if not Certificate.objects.filter(username=user,course=crse).exists():
                user=Certificate.objects.filter(username=user)
                # for i in user:
                #     print(i.username)
                print(user,'lllllllllllll')
                
                if user:
                    # k=PostCertificate.objects.create(certicate=data['certicate'],usercertificate=data['usercertificate'],
                    #                                success=True)
                    # print(k)
                    serializer=PostCertificateSerializer(data=data)
                    print(serializer)
                    print('lllllllllll')
                    if serializer.is_valid():
                        
                        serializer.save()
                        
                    return Response(serializer.data)
                else:
                    return Response("You are not in certificatae list,somethomg went wrong")
            else:
                return Response("allready posted certiifcte")
    except:
        return Response("not matching query in certificate")
    else:
        return Response("not matching query in certificate")
    # else:
    #     return Response('not matching query in certificate')
    
@api_view(['GET'])
@authentication_classes([JWTTutorAuthentication])
def teachercheckcertificate(request):
    user=request.user
    print(user)
    print(id)
    s=str(id)
    print(s)
    cert= Certificate.objects.filter(is_eligible=True)
    print(cert)
    print(cert.values())
    for i in cert:
        s=i.course
    print(type(s))
        
    if cert:
        print("mmmmmmmmm")
        k=Certificate.objects.get(course=s)
        if k:
            print(k)
            print('kkkkkkkkkkkkkk')
            serializer=teachercheckcertificateserializers(k)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_302_FOUND)
    else:
        return Response(status=status.HTTP_302_FOUND)
       
    