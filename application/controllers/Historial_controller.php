<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

/**
 * @author diego
 *
 */
class Historial_controller extends REST_Controller
{
    
    /**
     * Constructor vacio de controlador de historiales 
     */
    public function __construct(){
        
        parent::__construct();
        
        $this->load->model('historial_model', 'mymodel');
    }
        
    /**
     * @param int $id
     */
    public function index_get($id = null)
    {
        
        if (is_null($id))
        {
            $this->response("No se proporciono el parametro 'id' de la consulta", 400);
        }
                
        $query = $this->mymodel->get($id);
                
        if (!is_null($query))
        {
            $this->response(array('historial' => $query), 200);
        }
        else
        {
            $this->response(array('error' => "ID historial no encontrado"), 400);
        }
    }//End function index_get
    
    public function index_post($id = NULL)
    {
        if (is_null($id) || !$this->post('data'))
        {
            $this->response(array('error' => "No se recibió el objeto post o ID"), 400);
        }
        else 
        {
            $data = $this->post('data');
            
            if ($this->mymodel->save($id, $data['hospital_id']))
            {
                $this->response(array('response'  => 'Historial creado exitosamente'), 201);
            }
            else {
                $this->response(array('error' =>"Surgio un error de servidor"), 400);
            }
            
        }
    }//End function index_post
    
    public function update_post($id = NULL) {
        
        if (!$this->post('data')) {
            
            $this->response(array('error' => "No se recibió el objeto post o ID"), 400);
        }
        else{
            $data = $this->post('data');
            
            if ($this->mymodel->update($id, $data)) {
                
                $this->response(array('response' => 'Objeto actualizado exitosamente'), 200);
            }
            else {
                $this->response(array('error' => 'No se puede actualizar el objeto'), 400);
            }
        }
    }
    
        
}

