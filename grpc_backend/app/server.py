import grpc
from concurrent import futures
from sqlmodel import Session
from common import crud, model
from common.database import engine

import glossary_pb2
import glossary_pb2_grpc

class GlossaryService(glossary_pb2_grpc.GlossaryServiceServicer):
    def GetTerms(self, request, context):
        with Session(engine) as session:
            terms = crud.get_terms(session, skip=request.skip, limit=request.limit)
            return glossary_pb2.GetTermsResponse(
                terms=[glossary_pb2.Term(
                    id=t.id,
                    term=t.term,
                    definition=t.definition,
                    source=t.source
                ) for t in terms]
            )

    def GetTermById(self, request, context):
        with Session(engine) as session:
            t = crud.get_term_by_id(session, request.id)
            if not t:
                context.abort(grpc.StatusCode.NOT_FOUND, "Term not found")
            return glossary_pb2.Term(
                id=t.id,
                term=t.term,
                definition=t.definition,
                source=t.source
            )

    def CreateTerm(self, request, context):
        with Session(engine) as session:
            term_data = model.GlossaryTermUpdate(
                term=request.term,
                definition=request.definition,
                source=request.source
            )
            t = crud.create_term(session, term_data)
            return glossary_pb2.Term(
                id=t.id,
                term=t.term,
                definition=t.definition,
                source=t.source
            )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    glossary_pb2_grpc.add_GlossaryServiceServicer_to_server(GlossaryService(), server)
    server.add_insecure_port('[::]:6000')
    server.start()
    print("gRPC server running on port 6000...")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()