import React from "react";
import { withFormik } from "formik";
import api from "../../services/api";
import * as Yup from "yup";
import Select from "react-select";

const tech = [
  { value: 1, label: "reactjs" },
  { value: 2, label: "nodejs" },
  { value: 3, label: "react native" }
];
// import { Container } from './styles';
/** quando colocamo withFormik ele nos da algumas propriedades para nosso componente para lidar com os forms
 * a primeira é o handleChange precisamos passa em todos os inputs,
 *  dps temos q passar o value tbm, dentro do componente colocamos "values" ex: value={values.name}
 */
/** dentro do form passamos o onSubmit: passando  o handleSubmit */

/**
 * para mostrar msg de erros para o usuario passamos Errors como parametro no componente e utilizamos
 * ex : {!! erros.password && <span>{errors.password}<span> } */
const UserForm = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  setFieldValue
}) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="nome"
      type="text"
      name="name"
      onChange={handleChange}
      value={values.name}
    />
    {!!errors.name && <span>{errors.name}</span>}
    <br />
    <input
      placeholder="email"
      type="text"
      name="email"
      onChange={handleChange}
      value={values.email}
    />

    {!!errors.email && <span>{errors.email}</span>}

    <br />
    <input
      placeholder="senha"
      type="password"
      name="password"
      onChange={handleChange}
      value={values.password}
    />

    {!!errors.password && <span>{errors.password}</span>}
    <br />
    <input
      placeholder="Confirmar senha"
      type="password"
      name="password_confirmation"
      onChange={handleChange}
      value={values.password_confirmation}
    />
    {!!errors.password_confirmation && (
      <span>{errors.password_confirmation}</span>
    )}
    <Select
      placeholder="Tecnologias"
      options={tech} //opcoes do select array de tech
      isMulti //selecionar mais de uma tecnologia por vez
      onChange={value => setFieldValue("tech", value)}
      /**esse selec nao aceita um name, entao temos que utilizar o setFieldValue, 
      qe utilizamos quando temos entrada diferente do padrao do input normal do html  ele é passado
      como parametro la no component*/
      value={values.tech}
    ></Select>
    <button type="submit"> Enviar </button>
  </form>
);

/** withFormki é um high order entao se escreve da forma abaixo igual o connect
 * o retorno dele é uma função dentro deles tem algumas funçoes que podemos utilizar
 * handleSubmit: é responsavel por lidar como submite do formulario é nele que vamos
 * fazer nossa chamada a api.
 * mapPropsToValues: devemos retornar uma função q retorna um objeto que inicializa o valor dos
 * campos varios com a seguir, conseguimos tbm atraves das props pegar as propriedados do componente
 *
 */
export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  }),

  /** para lidar com a validação dentro do withFormik e com yup, basta simplesmente passa
   * validationSchema:  Yup.object.shape() << essa definição é padrao
   */

  validateOnChange: false, // valida quando usuario sai do campo
  validateOnBlur: false, //valida quando usuario esta digitando

  validationSchema: Yup.object().shape({
    name: Yup.string().required("campo obrigatorio"),
    email: Yup.string()
      .email("E-mail invalido")
      .required("campo obrigatorio"),
    password: Yup.string().required("Campo obrigatorio"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "as senhas nao batem") //referencia ao campo que quer verificar se esta igual
      .required()
  }),

  /**dentro do handleSubmit chamamos nossa api pq ele que vai enviar os valores do input pra lá
   * essa props é para pegar os dados passados no corpo da url ex: id
   * aqi dentro do handle passamos nosso metodo api.postOrPut que esta dentro do services api, passando
   * id e values
   */
  handleSubmit: (values, { props }) => {
    /** o const abaixo ta pegando o id da url com o match */
    const { id } = props.match.params;

    /** pegando somente o value das techs, que no caso viria la do nosso backend pela api */

    const data = {
      ...values,
      tech: values.tech.map(t => t.value)
    };

    api.postOrPut("users", id, data);
  }
})(UserForm);
