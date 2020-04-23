<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Historial_controller extends REST_Controller
{
    
    public function __construct(){
        
        parent::__construct();
                
        $this->load->model(array(
            'historial_model', 'paciente_model', 'diagnosticos_model',
            'enfermedades_asociadas_model','factores_de_riesgo_asociados_model',
            'antecedentes_familiares_model','odontologia_model','nutricion_model','psicologia_model',
            'enfermeria_model','oftalmologia_model','circulatorio_model','examen_fisico_model','renal_model',
            'complicaciones_agudas_de_diabetes_model','pies_model','laboratorio_model',
            'internaciones_relacionadas_con_enfermedades_de_base_model','tratamiento_actual_model',
            'conducta_medica_model','solicitud_de_practica_model','solicitud_interconsultas_model',
            'inmunizaciones_model','seguimiento_model','datos_clinicos_model', 'datos_de_laboratorio_model',
            'medicamentos_model'
        ));        
    }
    
    public function index_get($id = null)
    {
        if (is_null($id))
        {
            $this->response("No se proporciono el parametro 'id' de la consulta", 400);
        }
                
        $query = $this->historial_model->get($id);
        
        $historial = array(
            'id'            =>$query->id,
            'hospital_id'   =>$query->hospital_id,
            'paciente'      =>$this->paciente_model->get($id),
            'diagnosticos'  =>$this->diagnosticos_model->get($id)
        );
                
        if (!is_null($historial))
        {
            $this->response(array('historial' => $historial), 200);
        }
        else
        {
            $this->response(array('error' => "ID historial no encontrado"), 400);
        }
    }
    
    public function index_post()
    {
        if (!$this->post('data'))
        {
            $this->response(array('error' => "No se recibió el objeto historial"), 400);
        }
        else 
        {
            $data = $this->post('data');
            
            $id = $this->paciente_model->save($data['paciente']);
            
            if (!is_null($id))
            {
                $ok = array();
                $ok['historial'] = $this->historial_model->save($id, $data['hospital']);
                $ok['diagnostico'] = $this->diagnosticos_model->save($id);
                $ok['enfermedades_asociadas'];
                $ok['factores_de_riesgo_asociados'];
                $ok['antecedentes_familiares'];
                $ok['odontologia'];
                $ok['nutricion'];
                $ok['psicologia'];
                $ok['enfermeria'];
                $ok['oftalmologia'];
                $ok['circulatorio'];
                $ok['examen_fisico'];
                $ok['renal'];
                $ok['complicaciones_agudas_de_diabetes'];
                $ok['pies'];
                $ok['laboratorio'];
                $ok['internaciones_relacionadas_con_enfermedades_de_base'];
                $ok['tratamiento_actual'];
                $ok['conducta_medica'];
                $ok['solicitud_de_practica'];
                $ok['solicitud_interconsultas'];
                $ok['inmunizaciones'];
                $ok['seguimiento'];
                $ok['datos_clinicos'];
                $ok['datos_de_laboratorio'];
                $ok['medicamentos'];
                                    
//                 {
//                     $this->response(array('id'  => $id), 200);
//                 }
//                 else
//                 {
//                     $this->response(array('error' => 'No se pudo almacenar el historial'), 400);
//                 }
            }
            else
            {
                $this->response(array('error' =>"Surgio un error de servidor"), 400);
            }
        }
    }
    
    public function update_post($data) {
        
        $id = $data['id'];        
        $objeto = $data['objeto'];              
        $control = $data['control'];        
        $valor = $data['valor'];
        
        $objetos =  array('diagnosticos','enfermedades_asociadas','factores_de_riesgo_asociados',
                          'antecedentes_familiares','odontologia','nutricion','psicologia',
                          'enfermeria','oftalmologia','circulatorio','examen_fisico','renal',
                          'complicaciones_agudas_de_diabetes','pies','laboratorio',
                          'internaciones_relacionadas_con_enfermedades_de_base','tratamiento_actual',
                          'conducta_medica','solicitud_de_practica','solicitud_interconsultas',
                          'inmunizaciones','seguimiento','datos_clinicos', 'datos_de_laboratorio',    
                          'medicamentos');        
    }
    
}

