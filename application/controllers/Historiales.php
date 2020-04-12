<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Historiales extends REST_Controller
{
    
    public function __construct(){
        parent::__construct();
        $this->load->model('historiales_model');
    }
    
    public function index_get($id = null)
    {
        if (is_null($id))
        {
            $this->response("No se proporciono el parametro 'id' de la consulta", 400);
        }
        
        $historial = $this->historiales_model->get($id);
        
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
        if (!$this->post('historial'))
        {
            $this->response(array('error' => "No se recibió el objeto historial"), 400);
        }
        else 
        {
            $saved = $this->historiales_model->save($this->post('historial'));
            
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

