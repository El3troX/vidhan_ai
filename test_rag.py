import io
import sys
import datetime
from contextlib import redirect_stdout
from rag import ask, classify_intent

test_queries = [
    "Can you tell me my rights",
    "What are my legal rights in India",
    "What protections do citizens have",
    "Explain basic rights",
    "What is Article 21 of the Indian Constitution",
    "Explain the right to equality",
    "What are Fundamental Rights",
    "What does Article 19 guarantee",
    "Is privacy a fundamental right",
    "What happens after someone is arrested",
    "What does the law say about arrest without warrant",
    "How long can police keep someone in custody",
    "What is police custody",
    "What is judicial custody",
    "What rights does a person have during arrest",
    "Can police detain someone without informing reason",
    "What protections exist for arrested persons",
    "What happens if someone is jailed without conviction",
    "What is considered theft under Indian law",
    "What is cheating according to law",
    "What punishment does law prescribe for robbery",
    "Explain criminal breach of trust",
    "What is an offence under BNS",
    "Difference between IPC and BNS",
    "Difference between CrPC and BNSS",
    "How is BNS different from IPC",
    "Old criminal law vs new criminal law",
    "Can police enter a house without warrant",
    "Can police search without permission",
    "Can police arrest anyone anytime",
    "Can police shoot without reason",
    "Can someone be jailed forever without trial",
    "What should I do if police come to my house",
    "What should I do if I am arrested",
    "How can I get bail",
    "How do I file a case",
    "What is the best legal strategy",
    "How can I win my case",
    "How do I avoid punishment",
    "What should I tell the judge",
    "Explain constitutional remedies",
    "What is habeas corpus",
    "What are writs under Indian Constitution",
    "What is due process of law",
    "What does personal liberty mean",
    "Explain preventive detention",
    "Can government restrict freedom",
    "What is rule of law",
    "What does equality before law mean"
]

output_file = f"vidhan_ai_test_results_{datetime.date.today()}.txt"

with open(output_file, "w", encoding="utf-8") as f:
    for q in test_queries:
        f.write("QUERY:\n")
        f.write(q + "\n\n")

        try:
            intent = classify_intent(q)
        except:
            intent = "INTENT_CLASSIFICATION_FAILED"

        f.write("DETECTED INTENT:\n")
        f.write(intent + "\n\n")

        buffer = io.StringIO()
        with redirect_stdout(buffer):
            try:
                ask(q)
            except Exception as e:
                print(str(e))

        f.write("OUTPUT:\n")
        f.write(buffer.getvalue())
        f.write("\n" + "=" * 80 + "\n\n")

print("All test outputs saved to", output_file)
