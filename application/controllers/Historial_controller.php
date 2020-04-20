<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Historial_controller extends REST_Controller
{
    
    public function __construct(){
        
        parent::__construct();
        
        $this->load->model('Historial_model', 'Paciente_model');        
    }
    
    public function index_get($id = null)
    {
        if (is_null($id))
        {
            $this->response("No se proporciono el parametro 'id' de la consulta", 400);
        }
                
        $historial = $this->Historial_model->get($id);
                
        if (!is_null($historial))
        {
            $this->response($historial, 200);
        }
        else
        {
            $this->response(array('error' => "ID historial no encontrado"), 400);
        }
    }
    
    public function index_post()
    {
        if (!$this->post('historial'))
        {
            $this->response(array('error' => "No se recibió el objeto historial"), 400);
        }
        else 
        {
            $saved = $this->Historial_model->save($this->post('historial'));
            
            if ($saved)
            {
                $this->response(array('response'  => "El historial fue registrado satisfactoriamente"), 200);
            }
            else
            {
                $this->response(array('error' =>"Surgio un error de servidor"), 400);
            }
        }
    }
    
}

