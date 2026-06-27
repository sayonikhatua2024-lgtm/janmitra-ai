from google import genai
import os
import json

# Initialize client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY", "paste_your_key_here"))
MODEL = "gemini-2.5-flash"


def classify_issue(text: str) -> dict:
    """Classify citizen complaint into category and extract location."""
    prompt = f"""
You are an AI assistant for a civic grievance system in India.
Analyze the following citizen complaint and respond ONLY in JSON format.

Complaint: "{text}"

Respond with this exact JSON structure:
{{
  "category": "<one of: Roads, Water, Electricity, Healthcare, Education, Sanitation, Agriculture, Security, Other>",
  "subcategory": "<specific issue type>",
  "location_mentioned": "<extracted location or null>",
  "language_detected": "<language name>",
  "severity": "<Low, Medium, High, Critical>",
  "translated_text": "<English translation if not English, else same text>",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}}
"""
    response = client.models.generate_content(model=MODEL, contents=prompt)
    text_response = response.text.strip()
    if text_response.startswith("```"):
        text_response = text_response.split("```")[1]
        if text_response.startswith("json"):
            text_response = text_response[4:]
    return json.loads(text_response.strip())


def summarize_complaints(complaints: list) -> dict:
    """Summarize a list of similar complaints into themes."""
    combined = "\n".join([f"- {c}" for c in complaints])
    prompt = f"""
You are an AI assistant helping an MP understand constituency issues.
Here are multiple citizen complaints:

{combined}

Respond ONLY in JSON format:
{{
  "theme": "<common theme in one sentence>",
  "summary": "<2-3 sentence summary of the core issue>",
  "affected_count": {len(complaints)},
  "urgency": "<Low, Medium, High, Critical>",
  "recommended_action": "<specific actionable recommendation for the MP>"
}}
"""
    response = client.models.generate_content(model=MODEL, contents=prompt)
    text_response = response.text.strip()
    if text_response.startswith("```"):
        text_response = text_response.split("```")[1]
        if text_response.startswith("json"):
            text_response = text_response[4:]
    return json.loads(text_response.strip())


def analyze_image_complaint(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    """Analyze an image submitted as a complaint."""
    prompt = """
You are an AI assistant for a civic grievance system in India.
Analyze this image submitted as a citizen complaint.
Respond ONLY in JSON format:
{
  "issue_detected": "<what problem is visible>",
  "category": "<Roads, Water, Electricity, Healthcare, Education, Sanitation, Agriculture, Security, Other>",
  "severity": "<Low, Medium, High, Critical>",
  "description": "<2-3 sentence description of the issue>",
  "suggested_action": "<what action should be taken>"
}
"""
    from google.genai import types
    image_part = types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
    response = client.models.generate_content(model=MODEL, contents=[prompt, image_part])
    text_response = response.text.strip()
    if text_response.startswith("```"):
        text_response = text_response.split("```")[1]
        if text_response.startswith("json"):
            text_response = text_response[4:]
    return json.loads(text_response.strip())


def generate_mp_report(priority_items: list) -> str:
    """Generate a human-readable report for the MP dashboard."""
    items_text = "\n".join([
        f"{i+1}. [{item['category']}] {item['summary']} (Score: {item['priority_score']}, Count: {item['count']})"
        for i, item in enumerate(priority_items[:10])
    ])
    prompt = f"""
You are an AI assistant generating a briefing report for a Member of Parliament in India.
Based on the top citizen complaints below, write a professional 150-word executive summary
that highlights the most urgent issues and recommends immediate actions.

Top Issues:
{items_text}

Write the report in clear, formal English suitable for an MP's office.
"""
    response = client.models.generate_content(model=MODEL, contents=prompt)
    return response.text.strip()


# Test function
if __name__ == "__main__":
    print("Testing Gemini API...")
    result = classify_issue("Road near school is damaged and causing accidents.")
    print(json.dumps(result, indent=2))
