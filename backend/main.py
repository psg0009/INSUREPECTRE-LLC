from fastapi import FastAPI, Request
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

model_id = "psg009/finetuned-phi2-insureadvisor"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)
qa_pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, max_new_tokens=128)

app = FastAPI()

@app.post("/ask")
async def ask(request: Request):
    data = await request.json()
    question = data.get("question", "")
    prompt = f"Question: {question}\nAnswer:"
    response = qa_pipe(prompt)[0]["generated_text"]
    answer = response.split("Answer:")[-1].strip()
    return {"answer": answer}
