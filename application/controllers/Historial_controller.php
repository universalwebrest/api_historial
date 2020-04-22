<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Historial_controller extends REST_Controller
{
    
    public function __construct(){
        
        parent::__construct();
        
        $this->load->library(array(            
            'historial_entity',
            'paciente_entity'
        ));
        
        $this->load->model(array(
            'historial_model',            
            'paciente_model'            
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
            'id'=>$query->id,
            'hospital_id'=>$query->hospital_id,
            'paciente'=>$this->paciente_model->get($id)
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
                if ($this->historial_model->save($id, $data['hospital']))
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
    
}

