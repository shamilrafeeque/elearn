from io import BytesIO
from django.template.loader import get_template

import xhtml2pdf.pisa as pisa
import uuid
from django.conf import settings

def save_pdf(params:dict):
    print("999999999999999")
    template =get_template("pdf.html")
    print("999999999999999")
    html = template.render(params)
    pdf = pisa.pisaDocument(BytesIO(html.encode('UTF-8')))
    file_name = uuid.uuid4()

    try:
        with open(str(settings.BASE_DIR) + f'/media/static/{file_name}.pdf', 'wb+') as output:
            pdf = pisa.pisaDocument(BytesIO(html.encode('UTF-8')), output)
    except Exception as e:
        print(e)
    if pdf.err:
        return '',False
    return file_name, True
     