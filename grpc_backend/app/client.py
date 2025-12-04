import grpc
import glossary_pb2
import glossary_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:6000')
    stub = glossary_pb2_grpc.GlossaryServiceStub(channel)

    # Пример: получить все термины
    response = stub.GetTerms(glossary_pb2.GetTermsRequest(skip=0, limit=10))
    for t in response.terms:
        print(t.id, t.term, t.definition, t.source)

if __name__ == "__main__":
    run()