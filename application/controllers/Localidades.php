<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Localidades extends REST_Controller
{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('localidades_model');
    }
    
    public function index_get()
    {
        $localidades = $this->localidades_model->get();
        
        if (is_null($localidades))
        {
            $this->response(array("error" => "No hay localidades registradas"));
        }
        else
        {
            $this->response(array("localidades" => $localidades));
        }
    }
    
    public function find_get($id = null)
    {
        if (is_null($id))
        {
            $this->response(array("error" => "El ID fue null"), 400);
        }
        else{
            
            $localidad = $this->localidades_model->find($id);
            
            $this->response(array("localidad" => $localidad), 200);
        }
        
    }
    
    public function index_post()
    {
        
    }
    
    public function update_post($id = null)
    {
        
    }
    
    public function index_delete($id = null)
    {
        
    }
    
}

