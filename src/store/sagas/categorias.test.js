import categoriasService from "services/categorias";
import { categoriasSaga, observarCategorias } from "./categorias";
import { call, cancel } from "redux-saga/effects";
import { adicionarTodasAsCategorias } from "store/reducers/categorias";
import { take } from "redux-saga/effects";
import { createMockTask } from "@redux-saga/testing-utils";

describe("Testando categorias saga", () => {
  describe("workers", () => {
    test("Deve executar categoriasService.buscar", () => {
      const funcaoGeradora = observarCategorias();
      const funcaoEsperada = call(categoriasService.buscar);

      funcaoGeradora.next(); // delay

      const funcaoExecutada = funcaoGeradora.next();

      expect(funcaoExecutada.value).toEqual(funcaoEsperada);
    });
  });
  describe("watchers", () => {
    test("Deve executar a tarefa corretamente", () => {
      const funcaoGeradora = categoriasSaga();

      funcaoGeradora.next();
      const funcaoEsperada = take(adicionarTodasAsCategorias);

      expect(funcaoGeradora.next().value).toEqual(funcaoEsperada);
    });
    test("Deve executar a tarefa apenas uma vez", () => {
      const funcaoGeradora = categoriasSaga();
      const mockTarefa = createMockTask();
      funcaoGeradora.next(mockTarefa);
      const funcaoCancelarEsperada = cancel(mockTarefa);
      funcaoGeradora.next();

      expect(funcaoGeradora.next().value.type).toEqual(
        funcaoCancelarEsperada.type
      );
    });
  });
});
