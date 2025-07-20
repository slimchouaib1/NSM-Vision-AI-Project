Set-Location 'C:\Users\slimc\Desktop\version-finale\my-app\chatbot_api'
. .\venv\Scripts\Activate.ps1
$env:GROQ_API_KEY="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" # REMEMBER TO REPLACE WITH YOUR ACTUAL KEY
uvicorn app:app --reload --host 0.0.0.0 --port 8001 