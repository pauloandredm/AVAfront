import { React, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import axios from '../../axiosConfig';
import SubmitButton from '../form/SubmitButton';
import API_BASE_URL from '../ApiConfig';
import styles from './Avaliacao.module.css';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { cpf } from "cpf-cnpj-validator";
import qs from 'qs';
import { BiHelpCircle } from "react-icons/bi";
import { BiShowAlt, BiHide } from 'react-icons/bi';


function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    /* ------ timeout mensagem ------ */
    useEffect(() => {
      let timer;
      if (showErrorMessage) {
        timer = setTimeout(() => {
          setShowErrorMessage(false);
          setErrorMessage('');
        }, 3000);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [showErrorMessage]);

    /*------------------ get lista de lotacoes------------------ */

    const [lotacoes, setLotacoes] = useState([]);

    useEffect(() => {
      axios.get(`${API_BASE_URL}/lotation/`)
          .then(response => {
            setLotacoes(response.data)
          })
          .catch(error => {
              console.log(error)
          })
    }, [])

// Função para verificar a matrícula e exibir os campos adicionais se não existir

const [cadastroAdicional, setCadastroAdicional] = useState({ nome: '', lotacoes: '' });
const [matriculaCompleta, setMatriculaCompleta] = useState('');
const [matriculaGestor, setMatriculaGestor] = useState(false);




/* -------- Formik --------- */

    const handleMatriculaChange = (event) => {
      let matricula = event.target.value;
      // Remover caracteres especiais
      matricula = matricula.replace(/[.-]/g, '');
      
      formik.setFieldValue('matricula', matricula);
      setMatriculaCompleta(matricula);
    };

    const verificarMatricula = async (matricula) => {
      try {
        // Remover o último dígito da matrícula
        const matriculaNAOtruncada = matricula
        const matriculaTruncada = matricula.slice(0, -1);
        matricula = matricula.replace(/[.-]/g, '');
        
        const response = await axios.get(`${API_BASE_URL}/matricula/`);
        const response2 = await axios.get(`${API_BASE_URL}/matriculaGestor/`);

        const matriculas = response.data.map((item) => item.matricula); // Extrai apenas as matrículas da lista
        const matriculas2 = response2.data.map((item) => item.matricula2);


        if(matriculas2.includes(String(matriculaNAOtruncada))){
          formik.setFieldValue('matricula', matriculaNAOtruncada);
          setCadastroAdicional(null);
          setMatriculaGestor(true);
          console.log("else if (matriculas.includes(String(matriculaTruncada)))")
          console.log(matriculaTruncada)
        }
        else if (matriculas.includes(String(matriculaTruncada))) {
          // Matrícula encontrada, não exibir campos adicionais
          formik.setFieldValue('matricula', matriculaTruncada);
          setCadastroAdicional(null);
          console.log("if(matriculas2.includes(String(matriculaTruncada)))")
          console.log(matriculaTruncada)
        } 
        else {
          // Matrícula não encontrada, exibir campos adicionais
          setCadastroAdicional({ nome: '', lotacoes: '' });
        }
      } catch (error) {
        // Lidar com erros de requisição, exibir mensagem de erro, etc.
      }
    };

    const handleMatriculaKeyPress = (event) => {
      const keyCode = event.which || event.keyCode;
      // Permitir apenas dígitos (0-9) e teclas de controle (backspace, delete, etc.)
      const isDigit = (keyCode >= 48 && keyCode <= 57) || keyCode === 8 || keyCode === 46;
      if (!isDigit) {
        event.preventDefault();
      }
    };

    const handleMatriculaPaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text');
      // Remover caracteres especiais do texto colado
      const sanitizedText = pastedText.replace(/[.-]/g, '');
      // Atualizar o valor do campo de matrícula
      formik.setFieldValue('matricula', sanitizedText);
    };
  
    const formik = useFormik({
      initialValues: {
        matricula: '',
        cpf: '',
        password: '',
        nome: '',
        lotacoes: [10],
      },
      validationSchema: Yup.object({
        cpf: Yup
          .string()
          .required("CPF is required")
          .test((value) => cpf.isValid(value)),
        matricula: Yup.string()
          .max(9, 'Must be 9 characters or less')
          .required('Required'),
        password: Yup.string()
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      }),

      

      onSubmit: async (values, { setSubmitting, resetForm }) => {   
        if (values.nome === '') {
          values.nome = 'aaaa'; // Definir 'aaaa' caso o campo nome esteja em branco
        }

        if (matriculaGestor) {
          values.matricula = matriculaCompleta; // Enviar a matriculaCompleta
        }
    
        try {
          const serializedData = qs.stringify(values, { encode: false });
          const response = await axios.post(`${API_BASE_URL}/register/`, serializedData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          navigate('/login');
          // process the response, e.g. show success message to user
          resetForm();
        } catch (error) {
          if (error.response && error.response.status === 400) {
            // Backend returned a 400 Bad Request
            setErrorMessage('CPF ou Matricula já existentes');
            setShowErrorMessage(true);
          } else {
            // Other types of errors, handle them accordingly
          }
        } finally {
          setSubmitting(false);
        }
      },
    });

    return (
    <form className={styles.avaliacao_container} onSubmit={formik.handleSubmit}>
      <div className={styles.form_control}>

        <label htmlFor="cpf">CPF
          <div className={styles.tooltip}><BiHelpCircle/>
            <span className={styles.tooltiptext}>
              Somente os números
            </span>
          </div>
        :</label>
        <input
          text="cpf"
          id="cpf"
          name="cpf"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cpf}
        />

        {formik.touched.cpf && formik.errors.cpf ? (
         <div className={styles.error}>{formik.errors.cpf}</div>
        ) : null}

        <label htmlFor="matricula">Matricula
          <div className={styles.tooltip}><BiHelpCircle/>
            <span className={styles.tooltiptext}>
              Somente os números
            </span>
          </div>
        :</label>
        <input
          text="matricula"
          id="matricula"
          name="matricula"
          type="number"
          onKeyPress={handleMatriculaKeyPress}
          onPaste={handleMatriculaPaste}
          onChange={handleMatriculaChange}
          onBlur={(event) => {
            verificarMatricula(event.target.value);
          }}
          value={matriculaCompleta}
        />

        {formik.touched.matricula && formik.errors.matricula ? (
         <div className={styles.error}>{formik.errors.matricula}</div>
        ) : null}

        {cadastroAdicional !== null && (
        <>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
          />

          <label htmlFor="lotacoes">Lotação:</label>
          <select
            id="lotacoes"
            name="lotacoes"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lotacoes}
          >
            <option value="">Selecione uma opção</option>
            {lotacoes.map((lotacao) => (
              <option key={lotacao.id} value={lotacao.id}>
                {lotacao.nome}
              </option>
            ))}
          </select>
        </>
        )}   

        <label htmlFor="password">Senha:</label>
        <div className={styles.password_input}>
          <input
            className={styles.input_container}
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {showPassword ? (
            <BiHide
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <BiShowAlt
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        
        {formik.touched.password && formik.errors.password ? (
         <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        
        <label htmlFor="passwordConfirm">Repita a senha:</label>
        <div className={styles.password_input}>
          <input
            className={styles.input_container}
            text="password"
            id="passwordConfirm"
            name="passwordConfirm"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
          />
          {showPassword ? (
            <BiHide
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <BiShowAlt
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <div className={styles.error}>{formik.errors.passwordConfirm}</div>
        ) : null}

      </div>
      <SubmitButton text="Cadastrar" />
      {showErrorMessage && <div className={styles.error_message}>{errorMessage}</div>}
    </form>
    )
}   

export default Register;
    