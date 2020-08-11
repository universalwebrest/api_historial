<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Factores_de_riesgo_asociados_controller extends REST_Controller
{    
    public function __construct() {        
        parent::__construct();        
        $this->load->model('factores_de_riesgo_asociados_model', 'mymodel');
    }
    
    public function index_get($id = NULL) {
        
        if (is_null($id))
        {
            $this->response(array('error' => 'El id proporcionado es null'), 400);
        }else{
            
            $query = $this->mymodel->get($id);
                        
            if (!is_null($query))
            {
                $this->response(array('factores_de_riesgo_asociados' => $query), 200);
            }
            else{
                $this->response(array('error' => 'El ID es inexistente'), 400);
            }
        }
    }//Fin metido index_get
    
    public function index_post($id) {
                
        if (is_null($id)) {
            
            $this->response(array('error' => 'El ID proporcionado es null'), 400);
        }
        else{
                        
            if ($this->mymodel->save($id)) {
                
                $this->response(array('response' => 'El objeto fue creado exitosamente'), 201);
            }
            else{
                $this->response(array('error' => 'Ocurrio un error en el servidor'), 400);
            }
        }
    }// Fin metodo index_post
    
    public function update_post($id) {
        
        if (is_null($id) || is_null($this->post('data'))) {
            
            $this->response(array('error' => 'El ID proporcionado es null'), 400);
        }
        else{
            
            $data = $this->post('data');
            
            if ($this->mymodel->update($id, $data)) {
                
                $this->response(array('response' => 'El objeto fue actualizado exitosamente'), 200);
            }
            else{
             
                $this->response(array('error' => 'Ocurrio un error en el servidor'), 400);
            }   
        }
    }
    
}
