<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Nutricion_controller extends REST_Controller
{
    public function __construct() {
        parent::__construct();
        $this->load->model('nutricion_model', 'mymodel');
    }
    
    public function index_get($id) {
        
        if (is_null($id)){
            $this->response(array('error' => 'El id fue nul'), 400);            
        }
        else
        {
            $register = $this->mymodel->get($id);
            
            if (!is_null($register)) {
                
                $this->response(array('response' => $register), 200);
            }
            else
            {
                $this->response(array('error' => 'ID inexistente.'), 400);
            }
        } 
    }
    
    public function index_post($id) {
        
        if (is_null($id)) {
            $this->response(array('error' => 'El id fue nul'), 400);
        }
        else
        {
            $query = $this->mymodel->save($id);
            
            if ($query == $id) {
                
                $this->response(array('response' => 'El objeto fue creado exitosamente'), 201);
            }
            else
            {
                $this->response(array('error' => $query), 400);
            }
        }
        
    }
    
    public function update_post($id) {
        
        if (is_null($id) || is_null($this->post('data'))) {
            $this->response(array('error' => 'Los parametros son null'), 400);
        }
        else
        {
            $data = $this->post('data');
            
            $query = $this->mymodel->update($id, $data);
            
            if ($query == $id) {
                $this->response(array('response' => 'Objeto actualizado exitosamente'), 200);
            }
            else
            {
                $this->response(array('error' => $query), 400);
            }
        }
        
    }
    
    
}

