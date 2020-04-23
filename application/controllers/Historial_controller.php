<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Historial_controller extends REST_Controller
{
    
    public function __construct(){
        
        parent::__construct();
                
        $this->load->model(array(
            'historial_model','paciente_model','diagnosticos_model','enfermedades_asociadas_model'
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
            'diagnosticos'  =>$this->diagnosticos_model->get($id),
            'enfermedades_asociadas' =>$this->enfermedades_asociadas_model->get($id)
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
                $ok['enfermedades_asociadas'] = $this->enfermedades_asociadas_model->save($id);
                
                if (!in_array(FALSE, $ok))
                {
                    $this->response(array('id'  => $id), 200);
                }
                else
                {
                    $this->response(array('error' => 'No se pudo almacenar el historial'), 400);
                }
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

